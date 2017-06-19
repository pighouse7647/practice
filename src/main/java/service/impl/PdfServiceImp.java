package service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.stereotype.Service;
import service.PdfService;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

/**
 * Created by Thomas Chen on 2017/5/1.
 */
@Slf4j
@Service
public class PdfServiceImp implements PdfService {

    @Override
    public void downloadPdfFIle(HttpServletResponse resp) {
        DefaultResourceLoader loader = new DefaultResourceLoader();

        try(OutputStream out = resp.getOutputStream();
            FileInputStream in = new FileInputStream(loader.getResource("classpath:").getFile() + "/Excel2PDF_Output.pdf");
        ) {
            resp.setHeader("Content-Disposition", "attachment; filename*=UTF-8''" + URLEncoder.encode("本機_2017工作日誌_Thomas" + "." + "pdf", "UTF-8"));
            // -- buffer size
            byte[] buff = new byte[1024];
            int offset;
            while ((offset = in.read(buff)) != -1) {
                out.write(buff, 0, offset);
            }
        } catch (IOException e) {
            e.printStackTrace();
            log.info("讀取檔案出錯, ={}");
        }
    }

    @Override
    public void transPdf2Word() {

    }
}
