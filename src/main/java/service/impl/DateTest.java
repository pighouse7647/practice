package service.impl;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

/**
 * Created by Default User on 2017/5/31.
 */
@Slf4j
public class DateTest {

    public static void main(String[] args) {

        LocalDate creditCardValidDate = LocalDate.of(2017, 5, 1);
        log.error("五月_調整前={}", creditCardValidDate);
        creditCardValidDate = creditCardValidDate.withDayOfMonth(creditCardValidDate.lengthOfMonth());
        log.error("五月_調整後={}", creditCardValidDate);
        if(LocalDate.now().compareTo(creditCardValidDate) > 0) {
            log.error("");
        }


    }

}
