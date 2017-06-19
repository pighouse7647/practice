/**
 * @auther: Joshua.lu
 * @version: 2016.12.08
 * 
 * 修改至網路 http://bootsnipp.com/snippets/featured/jquery-checkbox-buttons
 * 因應bootstrap toggle checkbox 無法用tab切換focus
 * 改成toggle button 可以用tab + 空格的方式去做選取
 * data-on-value, data-off-value不一定要傳入, 預設用true false
 * 
 * Sample1:
 * <span class="button-checkbox">
 *		<button type="button" class="btn" data-color="default" data-on="是" data-off="否"></button>
 *		<input id="premiumCountByFamliy" type="checkbox" class="hidden" name="premiumCountByFamliy" ${polItem.premiumCountByFamliy ? 'checked' : ''}/>
 * </span>
 * 
 * Sample2: data-on-value, data-off-value傳入
 * <span class="button-checkbox">
 *		<button type="button" class="btn" data-color="default" data-on="依身分別" data-off="無作用" data-on-value="A" data-off-value="B"></button>
 *		<input id="rateDelimitation" type="checkbox" class="hidden" name="rateDelimitation" ${polItem.rateDelimitation == 'B' ? 'checked' : ''} />
 * </span>
 * 
 */

(function ($) {
 
    $.fn.toggleButton = function(options) {
    	$('.button-checkbox').each(function () {
	        // Settings
	        var $widget = $(this),
	            $button = $widget.find('button'),
	            $checkbox = $widget.find('input:checkbox'),
	            settings = {
	                on: {
	                    icon: 'glyphicon glyphicon-check'
	                },
	                off: {
	                    icon: 'glyphicon glyphicon-unchecked'
	                }
	            };

	        // Event Handlers
	        $button.on('click', function () {
	            $checkbox.prop('checked', !$checkbox.is(':checked'));
	            $checkbox.triggerHandler('change');
	            updateDisplay();
	        });
	        
	        $checkbox.on('change', function () {
	            updateDisplay();
	        });

	        // Actions
	        function updateDisplay() {
	            var isChecked = $checkbox.is(':checked');
//	            alert("is checked=" + isChecked);

	            // Set the button's state
	            $button.data('state', (isChecked) ? "on" : "off");
	            
	            // 顯示button文字
	            $button.text(isChecked ? $button.attr('data-on') : $button.attr('data-off'));
	            $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
	            
	            // Update the button's color
	            if (isChecked) {
	                $button.removeClass('btn-default')
	                       .addClass('btn-primary active');
	            } else {
	                $button.removeClass('btn-primary active')
	                       .addClass('btn-default');
	            }
	            
	            // 判斷如果沒有傳入on/off value, 則預設用true/false
	            if (!!$button.attr('data-on-value') && !!$button.attr('data-off-value')) {
		            $checkbox.val(isChecked ? $button.attr('data-on-value') : $button.attr('data-off-value'));
	            } else {
	            	$checkbox.val(isChecked);
	            }
// 	            alert("checkbox value=" + $checkbox.val());
	        }

	        // Initialization
	        function init() {
	            updateDisplay();
	        }
	        
	        init();
	    });
    };
 
}(jQuery));