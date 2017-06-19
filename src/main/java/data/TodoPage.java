package data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Thomas Chen on 2017/4/30.
 */
@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class TodoPage {
//    @JsonManagedReference("todoModelImps_associations")
    List<TodoModel> todoModels = new ArrayList<>();
    String pageNo = "";

}
