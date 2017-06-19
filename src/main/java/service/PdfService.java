package service;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Thomas Chen on 2017/5/1.
 */
public interface PdfService {
 void downloadPdfFIle(HttpServletResponse resp);
 void transPdf2Word();

}