package data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Created by Thomas Chen on 2017/4/30.
 */
@Setter
@Getter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class TodoModel {
//    @JsonBackReference("todoModelImps_associations")
//    TodoPage todoPageImp;
    /** 模組 **/
    String module;
    /** 模組(短) **/
    String shortModule;
    /** 明天預計處理項目 **/
    String tomorrowItem;
    /** 今天處理項目 **/
    String todayItem;
    /** To Do List **/
    String todoItem;
    /** 類型 **/
    String itemType;
    /** 預計完成日 **/
    LocalDate completeDate;
    /** 工作日期 **/
    LocalDate workingDate;
    /** 回報人 **/
    String empName;
    /** 已完成比例 **/
    String completeRatio;
    /** 實際工時**/
    BigDecimal workHour;
    /** 預計處理內容 **/
    String anticipateDetail;
    /** 實際處理內容 **/
    String todayDetail;
    /** 未完成原因及後續處理 **/
    String excuse;
    /** 卡住的問題 **/
    String obstacle;


}
