require('../../lib/strings');

describe('String extensions', function(){

  describe('#capitalize', function(){

    it("should make the first letter of the string uppercase", function(){
      var sampleText = 'test';
      expect(sampleText.capitalize()).toBe('Test');
      expect('test'.capitalize()).toBe('Test');
    });
  });

  describe('#camelcase', function(){

    it("should camelcase text separated by spaces", function(){
      var sampleText = 'camelcase text string';
      expect(sampleText.camelcase()).toBe('CamelcaseTextString');
      expect("camelcase text string".camelcase()).toBe('CamelcaseTextString');
    });

    it("should camelcase snakecase text", function(){
      var sampleText = 'snake_case_text';
      expect(sampleText.camelcase()).toBe('SnakeCaseText');
      expect('snake_case_text'.camelcase()).toBe('SnakeCaseText');
    });

  });

});