$(function(){
  var fixes = [
    {
      name: 'remove amazon ads',
      cmds: [
        'sudo apt-get remove -y unity-lens-shopping',
        'sudo sh -c \'echo "127.0.0.1 productsearch.ubuntu.com" > /etc/hosts\''
      ]
    },
    {
      name: 'turn off other online search',
      cmds: ['gsettings set com.canonical.Unity.Lenses remote-content-search none']
    }
  ];
  
  // draw fix buttons
  $.each(fixes, function(){
    var $button = $('<div class="fix-button">'+this.name+'</div>')
      .data('cmds', this.cmds)
      .click(function(){
        if($(this).hasClass('off')) {
          $(this).removeClass('off');
          update_code();
        } else {
          $(this).addClass('off');
          update_code();
        }
      });
    $('#fixes').append($button);
  });
  
  // update code
  function update_code(){
    var code = '';
    $('.fix-button').each(function(){
      if(!$(this).hasClass('off')) {
        $.each($(this).data('cmds'), function(){
          code += this + '; ';
        });
      }
    });
    $('#cmd').html(code);
  }
  update_code();
});
