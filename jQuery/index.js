

// jQuery() = $

//$("h1").css("color","red");

$(document).keydown(function(event){
  $("h1").text(event.key);
})

$(document).on(function(){
  $("h1").css("color",'purple');
})

// create new elements without use html
$("h1").before("<button>New</button>")
$("h1").after("<button>New</button>")
$("h1").prepend("<button>New</button>")
$("h1").append("<button>New</button>")

// but you cant delete only those buttons. you have to delete all
//$("button").remove()
