$(function(){



 $(".rate-star").rateYo({//звездный рейтинг
  rating: 5,
  starWidth: "12px",
  readOnly: true
 });

$('.product-slider__inner').slick({
dots: true,
arrows: false,
 slidesToShow: 4,
 slidesToScroll: 4,
});


 var mixer = mixitup('.products__inner-box');//переключение наших картинок


 
});