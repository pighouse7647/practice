package service.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import data.TodoModel;
import data.TodoPage;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.extensions.XSSFCellBorder;
import org.springframework.beans.BeanUtils;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.stereotype.Service;
import service.ExcelService;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.Font;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

//import java.awt.*;

/**
 * Created by Thomas Chen on 2017/4/23.
 */
@Slf4j
@Service
public class ExcelServiceImp implements ExcelService {

    @Override
    public void downloadExcelFIle(HttpServletResponse resp) {
        DefaultResourceLoader loader = new DefaultResourceLoader();

        try {
            resp.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + URLEncoder.encode("本機_2017工作日誌_Thomas" + "." + "xlsx", "UTF-8"));
//            Workbook wb = WorkbookFactory.create(new File("C:/公司/本機_2017工作日誌_Thomas.xlsx"));
            Workbook wb = WorkbookFactory.create(new File(loader.getResource("classpath:").getFile() + "/dailyReport.xlsx"));
            OutputStream out = resp.getOutputStream();
            wb.write(out);
            wb.close();
            out.close();

        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
            log.info("讀取檔案出錯, ={}");

        }
    }


    @Override
    public XSSFWorkbook createExcelFile(TodoPage todoPage) {
        todoPage.getPageNo();
        XSSFWorkbook bk = new XSSFWorkbook();   // Generate one workBook.
        XSSFSheet sheet_0 = bk.createSheet();        // Generate one sheet.
        XSSFSheet sheet_1 = bk.createSheet();        // Generate one sheet.
//        log.info("sheet_1.getColumnWidth(0)={}", sheet_1.getColumnWidth(0));
//        log.info("sheet_1.getColumnWidth(0)={}", sheet_1.getColumnWidth(1));
//        sheet_1.setColumnWidth(0, 5000);
//        sheet_1.setColumnWidth(1, 5000);
//        sheet_1.setColumnWidth(2, 5000);
//        sheet_1.setColumnWidth(3, 50);
//        sheet_1.setColumnWidth(4, 50);
//        sheet_1.setColumnWidth(5, 50);
        List<TodoModel> todos = todoPage.getTodoModels();
        this.changeSelectValue2String(todos);

        // 兩個table的間隔
        int gapSize = 3;

        // 第一
        final List<TodoModel> firstTodos = todos.stream().filter(todo -> todo.getTodayItem() != null).filter(todo -> todo.getEmpName() == null).collect(Collectors.toList());
        this.createHeader(sheet_1, new String[]{"模組", "今天處理項目", "預計完成日", "預計處理內容", "實際處理內容", "未完成原因及後續處理", "卡住的問題"}, 0, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.LIGHT_CORNFLOWER_BLUE));
        this.createBody(sheet_1, new String[]{"module", "todayItem", "completeDate", "anticipateDetail", "todayDetail", "excuse", "obstacle"}, 1, firstTodos, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.WHITE));


        // 第二
        final List<TodoModel> secondTodos = todos.stream().filter(todo -> todo.getTomorrowItem() != null).collect(Collectors.toList());
        this.createHeader(sheet_1, new String[]{"模組", "明天預計處理項目", "預計完成日", "預計處理內容"}, sheet_1.getLastRowNum() + gapSize, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.LIGHT_CORNFLOWER_BLUE));
        this.createBody(sheet_1, new String[]{"module", "tomorrowItem", "completeDate", "anticipateDetail"}, sheet_1.getLastRowNum() + 1, secondTodos, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.WHITE));


        // 第三
        final List<TodoModel> thirdTodos = todos.stream().filter(a -> a.getCompleteRatio() != null).filter(todo -> todo.getEmpName() == null).collect(Collectors.toList());
        this.createHeader(sheet_1, new String[]{"模組", "To Do List", "預計完成日", "已完成比例"}, sheet_1.getLastRowNum() + gapSize, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.LIGHT_CORNFLOWER_BLUE));
        this.createBody(sheet_1, new String[]{"module", "todoItem", "completeDate", "completeRatio"}, sheet_1.getLastRowNum() + 1, thirdTodos, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.WHITE));


        // 第二頁 第一
        final List<TodoModel> firstDailys = todos.stream().filter(a -> a.getEmpName() != null).collect(Collectors.toList());
        this.createHeader(sheet_0, new String[]{"回報者", "工作日期", "專案名稱", "專案模組", "類型", "項目", "進度", "實際工時", "內容"}, sheet_0.getLastRowNum(), this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.LIGHT_CORNFLOWER_BLUE));
        this.createBody(sheet_0, new String[]{"empName", "workingDate", "module", "shortModule", "itemType", "todayItem", "completeRatio", "workHour", "todayDetail"}, sheet_0.getLastRowNum() + 1, firstDailys, this.createCellStyle(bk, BorderStyle.THIN, IndexedColors.WHITE));



        // 必須在所有動作結束後再設定Cell.size, 否則無效.
        this.setColumnsWidth(sheet_1, new int[]{5000, 5000, 5000, 5000, 5000, 6000, 5000});
        this.setColumnsWidth(sheet_0, new int[]{5000, 5000, 5000, 3000, 3000, 3000, 3000, 3000, 8000});
        return bk;
    }

    @Override
    public void savaExcelFile(XSSFWorkbook xssfWorkbook) {
        DefaultResourceLoader loader = new DefaultResourceLoader();
//        loader.getResource("classpath:/").get
        try (OutputStream out = new FileOutputStream(loader.getResource("classpath:").getFile() + "/dailyReport.xlsx")) {
            xssfWorkbook.write(out);
            xssfWorkbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void createHeader(XSSFSheet sheet, String[] headerStr, int rowIndx, CellStyle style) {
        XSSFRow firstHead = sheet.createRow(rowIndx);
        for (int c = 0; c < headerStr.length; c ++) {
            XSSFCell cell = firstHead.createCell(c);
            cell.setCellValue(headerStr[c]);
            cell.setCellStyle(style);
        }
    }

    @Override
    public void createBody(XSSFSheet sheet, String[] attrName, int beginRowIndx, List<TodoModel> todos, CellStyle cellStyle) {
        // Convert list to array.
        TodoModel[] todoArray = new TodoModel[todos.size()];
        todoArray = todos.toArray(todoArray);

        for(int r = 0; r < todoArray.length; r++) {
            XSSFRow row = sheet.createRow(r + beginRowIndx);    // Generate one row.
            for (int c = 0; c < attrName.length; c++) {
                XSSFCell cell = row.createCell(c);                      // Generate one column.
                cell.setCellStyle(cellStyle);                           // Set cell's style.
                Object attrValue = null;
                try {
                    // getter
                    attrValue = BeanUtils.getPropertyDescriptor(todoArray[r].getClass(), attrName[c]).getReadMethod().invoke(todoArray[r]);
                } catch (IllegalAccessException | InvocationTargetException e) {
                    log.error("反射器出錯={}", e);
                }

                // 日期需要特別處理
                if(attrValue instanceof LocalDate) {
//                    CreationHelper createHelper = sheet.getWorkbook().getCreationHelper();
//                    cellStyle.setDataFormat(
//                            createHelper.createDataFormat().getFormat("yyyy/mm/dd"));
                    cell.setCellValue(((LocalDate) attrValue).format(DateTimeFormatter.ofPattern("uuuu/MM/dd")));
                } else if(attrValue instanceof BigDecimal) {
                    cell.setCellValue(((BigDecimal) attrValue).doubleValue());
                } else {
                    // 其餘欄位皆依字串處理
                    cell.setCellValue((String) attrValue);
                }
            }

        }



    }

    @Override
    public void changeSelectValue2String(List<TodoModel> todos) {

        todos.forEach(a -> {

            if(a.getModule() != null) {
                switch (a.getModule()) {
                    case "YGP":
                        a.setModule("元大人壽");
                        break;
                    case "TRAIN":
                        a.setModule("教育訓練");
                        break;
                    case "CMP":
                        a.setModule("公司");
                        break;
                }

            }

            if(a.getTodayItem() != null) {
                switch (a.getTodayItem()) {
                    case "qot":
                        a.setTodayItem("報價");
                        break;
                    case "pol":
                        a.setTodayItem("新契約");
                        break;
                    case "eda":
                        a.setTodayItem("保全");
                        break;
                    case "clm":
                        a.setTodayItem("理賠");
                        break;
                    case "edu":
                        a.setTodayItem("教育訓練");
                        break;
                    case "oth":
                        a.setTodayItem("其他");
                        break;
                }
            }

            if(a.getTomorrowItem() != null) {
                switch (a.getTomorrowItem()) {
                    case "qot":
                        a.setTomorrowItem("報價");
                        break;
                    case "pol":
                        a.setTomorrowItem("新契約");
                        break;
                    case "eda":
                        a.setTomorrowItem("保全");
                        break;
                    case "clm":
                        a.setTomorrowItem("理賠");
                        break;
                    case "edu":
                        a.setTomorrowItem("教育訓練");
                        break;
                    case "oth":
                        a.setTomorrowItem("其他");
                        break;
                }

            }
            if(a.getTodoItem() != null) {
                switch (a.getTodoItem()) {
                    case "qot":
                        a.setTodoItem("報價");
                        break;
                    case "pol":
                        a.setTodoItem("新契約");
                        break;
                    case "eda":
                        a.setTodoItem("保全");
                        break;
                    case "clm":
                        a.setTodoItem("理賠");
                        break;
                    case "edu":
                        a.setTodoItem("教育訓練");
                        break;
                    case "oth":
                        a.setTodoItem("其他");
                        break;
                }
            }
            if(a.getItemType() != null) {
                switch (a.getItemType()) {
                    case "dev":
                        a.setItemType("開發");
                        break;
                    case "mt":
                        a.setItemType("會議");
                        break;
                    case "oth":
                        a.setItemType("其他");
                        break;
                }
            }

        });



    }

    @Override
    public CellStyle createCellStyle(XSSFWorkbook workbook, BorderStyle borderStyle, IndexedColors indexedColors) {
        // 標題底色
        XSSFCellStyle style = workbook.createCellStyle();
        // 顏色
//        style.setFillBackgroundColor(new XSSFColor(Color.blue));
//        style.setFillBackgroundColor(IndexedColors.BLACK.getIndex());
        style.setFillForegroundColor(indexedColors.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
//        style.setFillForegroundColor(new XSSFColor(new byte[] {(byte) 130, (byte) 150, (byte) 200, (byte) 200}));
        // 收縮
//        style.setShrinkToFit(true);   // 讓字適應框
        style.setWrapText(true);        // 讓字依照框來換行
        // 框線
        style.setBorderLeft(borderStyle);
        style.setBorderBottom(borderStyle);
        style.setBorderRight(borderStyle);
        style.setBorderTop(borderStyle);
        style.setBorderColor(XSSFCellBorder.BorderSide.BOTTOM, new XSSFColor(Color.black));

        return style;
    }

    @Override
    public void setColumnsWidth(XSSFSheet sheet, int[] widths) {
        // 必須在所有動作結束後再設定Cell.size, 否則無效.
        for(int i = 0; i < widths.length; i++) {
            sheet.setColumnWidth(i, widths[i]);
        }

    }

    @Override
    public void transExcel2Pdf(XSSFWorkbook xssfWorkbook) {
//        FileInputStream input_document = null;
        DefaultResourceLoader loader = new DefaultResourceLoader();

        try {

            // Read workbook into Workbook
//            Workbook my_xls_workbook = WorkbookFactory.create(new File(loader.getResource("classpath:").getFile() + "/dailyReport.xlsx"));
            Workbook my_xls_workbook = xssfWorkbook;
            // Read worksheet into Sheet
            Sheet my_worksheet = my_xls_workbook.getSheetAt(0);
            // To iterate over the rows
            Iterator<Row> rowIterator = my_worksheet.iterator();


            //We will create output PDF document objects at this point
            Document iText_xls_2_pdf = new Document();
            PdfWriter.getInstance(iText_xls_2_pdf, new FileOutputStream(loader.getResource("classpath:").getFile() + "/Excel2PDF_Output.pdf"));

            iText_xls_2_pdf.open();
            //we have two columns in the Excel sheet, so we create a PDF table with two columns
            //Note: There are ways to make this dynamic in nature, if you want to.
            PdfPTable my_table = new PdfPTable(9);
            //We will use the object below to dynamically add new data to the table
            PdfPCell table_cell;


            //Loop through rows.
            while(rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();
                while(cellIterator.hasNext()) {
                    Cell cell = cellIterator.next(); //Fetch CELL
                    switch(cell.getCellTypeEnum()) { //Identify CELL type
                        //you need to add more code here based on
                        //your requirement / transformations
                        case _NONE:
                            break;
                        case NUMERIC:
                            table_cell=new PdfPCell(new Phrase((float) cell.getNumericCellValue()));
                            my_table.addCell(table_cell);
                            break;
                        case STRING:
                            //Push the data from Excel to PDF Cell
//                            table_cell=new PdfPCell(new Phrase(cell.getStringCellValue()));
                            // 中文編碼
//                            BaseFont bfChinese = BaseFont.createFont("MHei-Medium","UniCNS-UCS2-H", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
                            BaseFont bfChinese = BaseFont.createFont("Helvetica","UTF-8", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","Big5", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","Cp1251", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","Cp1255", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","ISO-8859-1", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("Helvetica","windows-1251", BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("MHei-Medium",BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
//                            BaseFont bfChinese = BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
                            // 文字樣式
                            com.itextpdf.text.Font fontBlackCN = new com.itextpdf.text.Font(bfChinese, 12, Font.PLAIN, new BaseColor(0, 0, 0));
                            table_cell = new PdfPCell(new Phrase(new Chunk(cell.getStringCellValue(), fontBlackCN)));
                            //feel free to move the code below to suit to your needs
                            my_table.addCell(table_cell);
                            break;
                        case FORMULA:
                            table_cell=new PdfPCell(new Phrase(cell.getCellFormula()));
                            my_table.addCell(table_cell);
                            break;
                        case BLANK:
                            break;
                        case BOOLEAN:
                            table_cell=new PdfPCell(new Phrase(String.valueOf(cell.getBooleanCellValue())));
                            my_table.addCell(table_cell);
                            break;
                        case ERROR:
                            break;
                    }
                    //next line
                }

            }
            //Finally add the table to PDF document
            iText_xls_2_pdf.add(my_table);
            iText_xls_2_pdf.close();
//            input_document.close(); //close xls

        } catch (DocumentException | IOException e) {
//        } catch (DocumentException | InvalidFormatException | IOException e) {
            e.printStackTrace();
        }


    }


}
