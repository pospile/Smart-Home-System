// Makes first letter uppercase
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Camelize string
String.prototype.camelcase = function() {
  return this.replace(/_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+|_+)/g, function(match, index) {
    if (+match === 0) {
      return "";
    }
    return match.toUpperCase();
  });
};