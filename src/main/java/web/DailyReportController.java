package web;

import data.TodoPage;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.PdfService;
import service.impl.ExcelServiceImp;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Default User on 2017/4/23.
 */
@Slf4j
@Controller
@RequestMapping("/")
public class DailyReportController {

    @Autowired
    private ExcelServiceImp excelServiceImp;
    @Autowired
    private PdfService pdfService;

    @RequestMapping("/")
    public String indexPage(Model model) {
        model.addAttribute("hello", "hello");
        TodoPage page = new TodoPage();
        model.addAttribute("pageModel", page);
        log.info("model={}", model);
        log.info("進入首頁");
        return "/index";
    }

    @RequestMapping(value = "/query/excel", method = RequestMethod.GET)
    public void getExcel(HttpServletResponse resp) {
        excelServiceImp.downloadExcelFIle(resp);
    }

    @RequestMapping(value = "/query/pdf", method = RequestMethod.GET)
    public void getPdf(HttpServletResponse resp) {
        pdfService.downloadPdfFIle(resp);
    }

    @ResponseBody
    @RequestMapping(value = "/todo/insert", method = RequestMethod.PUT)
    public TodoPage insert(@RequestBody TodoPage todoPage) {
        log.info("todoPage.getTodoModels()=[]", todoPage.getTodoModels());
        XSSFWorkbook bk = excelServiceImp.createExcelFile(todoPage);
        excelServiceImp.savaExcelFile(bk);
        excelServiceImp.transExcel2Pdf(bk);

        return todoPage;
    }


}
