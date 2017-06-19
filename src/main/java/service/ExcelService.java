package service;

import data.TodoModel;
import data.TodoPage;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Thomas Chen on 2017/4/30.
 */
public interface ExcelService {

    /**
     * 取得完整的Excel檔案 用於下載用
     * @param resp
     */
    void downloadExcelFIle(HttpServletResponse resp);

    /**
     * 依照畫面所填資料製造出一個Excel檔案
     * @param todoPage  畫面資料的{@link TodoPage}
     * @return
     *
     */
    XSSFWorkbook createExcelFile(TodoPage todoPage);

    /**
     * 暫存在server端
     * @param xssfWorkbook
     */
    void savaExcelFile(XSSFWorkbook xssfWorkbook);

    /**
     * 標頭
     * @param sheet
     * @param headerStr
     * @param rowIndx
     * @param cellStyle
     */
    void createHeader(XSSFSheet sheet, String[] headerStr, int rowIndx, CellStyle cellStyle);

    /**
     * 動態新增列
     * @param sheet
     * @param attrName
     * @param beginRowIndx
     * @param todos
     * @param cellStyle
     */
    void createBody(XSSFSheet sheet, String[] attrName, int beginRowIndx, List<TodoModel> todos, CellStyle cellStyle);

    /**
     * 因為目前沒有Enum, 所以要寫死在這裡轉.
     * @param todos
     */
    void changeSelectValue2String(List<TodoModel> todos);

    /**
     * 設定cell的顏色, 框線.
     * @param workbook
     * @param borderStyle
     * @param indexedColors
     * @return
     */
    CellStyle createCellStyle(XSSFWorkbook workbook, BorderStyle borderStyle, IndexedColors indexedColors);

    /**
     * 設定cell的寬度
     * @param sheet
     * @param widths
     */
    void setColumnsWidth(XSSFSheet sheet, int[] widths);

    void transExcel2Pdf(XSSFWorkbook xssfWorkbook);


}
