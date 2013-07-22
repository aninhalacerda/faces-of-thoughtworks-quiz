'use strict';

describe('toml parser', function () {

  var markup;

  // load the module
  beforeEach(function(){
    module('toml');

    markup = '[twers]';
    markup += '   [twers.xdoctor]';
    markup += '   name = "Doctor X"';
    markup += '   gender = "m"';
    markup += '   picture = "3.jpg"';

    markup += '   [twers.spiderman]';
    markup += '   name = "Spider Man"';
    markup += '   gender = "m"';
    markup += '   picture = "4.jpg"';

    markup += '   [twers.chunglee]';
    markup += '   name = "Chung Lee"';
    markup += '   gender = "f"';
    markup += '   picture = "5.jpg"';

    markup += '   [twers.jgrey]';
    markup += '   name = "Jean Grey"';
    markup += '   gender = "female"';
    markup += '   picture = "6.jpg"';

    markup += '   [twers.storm]';
    markup += '   name = "Storm"';
    markup += '   gender = "female"';
    markup += '   picture = "7.jpg"';
  });

  it('should define the required library', inject(function(tomlLib){
    expect( tomlLib ).toBeDefined();
  }));

  // it('should parse the root node', inject(function(toml){
  //   expect( toml.parse(markup).twers ).toBeDefined();
  // }));

});
