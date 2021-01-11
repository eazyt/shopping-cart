// $(function () {

//   Stripe.setPublishableKey('pk_test_51I5WzSC61oZrgaYbxfGQSI84vxGbPLzOdNULJttjcirs3yNP8U1FHMxUrDco8woBTExVNhRjOY2NyGLrebstb0N400RV08QEPs');


//   var $form = $('#checkout-form');

//   $form.submit(function (event) {
//     $('#payment-errors').addClass('hidden');
//     $form.find('button').prop('disabled', true);
//     Stripe.card.createToken({
//       number: $('#card-number').val(),
//       cvc: $('#card-cvc').val(),
//       exp_month: $('#card-expiry-month').val(),
//       exp_year: $('#card-expiry-year').val(),
//       name: $('#card-name').val(),
//     }, stripeResponseHandler);
//     return false;
//   })


//   function stripeResponseHandler(status, response) {
//     // var $form = $('#payment-form');

//     if (response.error) {
//       // Show the errors on the form
//       $('#payment-errors').text(response.error.message);
//       $('#payment-errors').removeClass('hidden');
//       $form.find('button').prop('disabled', false);
//     } else {
//       // response contains id and card, which contains additional card details
//       var token = response.id;
//       // Insert the token into the form so it gets submitted to the server
//       $form.append($('<input type="hidden" name="stripeToken" />').val(token));
//       // $form.append($('<p  name="stripeToken" ></p>').val(token));

//       // var spinner = new Spinner(opts).spin();
//       // $('#loading').append(spinner.el);
//       // // and submit
//       $form.get(0).submit();
//     }
//   };

// });
