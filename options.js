//localStorage.regex=[]
//

$(document).ready(function(){
    $("body").focus();
    function newRuleNode(val){
        var li = $("<li></li>");
        var rule = $('<input type="text" placeholder="new rules"/>');
        var del_button = $('<button class="del-button">-</button>');
        del_button.click(function(){
            this.parentNode.remove();
        });
        if (val) rule.attr("value", val);
        li.append(rule);
        li.append(del_button);
        return li;
    }

    function refresh(){
        var rules;
        if (!localStorage.rules){
            rules = ["关注了", "不转不是", "星座"];
        } else {
            rules = JSON.parse(localStorage.rules);
        }
        var len = rules.length;
        for (var i=0;i<len;i++) {
            $("#rules-list").append(newRuleNode(rules[i]));
        }
        console.log("refresh success");
    }
    refresh();

    $("#save-button").click(function(){
        var rules = new Array();
        $("#rules-list li input[type='text']").each(function(){
            if (this.value!="") rules.push(this.value);
        });
        localStorage.rules = JSON.stringify(rules);
    });

    $("#add-button").click(function(){
        $("#rules-list").append(newRuleNode());
    });

    $(".del-button").click(function(){
        this.parentNode.remove();
    });
});
