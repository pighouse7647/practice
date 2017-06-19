package servlet3;

import config.SpringRootConfig;
import config.SpringWebConfig;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by Default User on 2017/4/23.
 */
public class MyWebInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {
    // Service config
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{SpringRootConfig.class};
    }

    // Controller config
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{SpringWebConfig.class};
    }


    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
