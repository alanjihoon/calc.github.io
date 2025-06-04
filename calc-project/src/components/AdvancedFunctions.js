class AdvancedFunctions {
  static squareRoot(value) {
    return Math.sqrt(value);
  }

  static exponentiate(base, exponent) {
    return Math.pow(base, exponent);
  }

  static sine(angle) {
    return Math.sin(this.toRadians(angle));
  }

  static cosine(angle) {
    return Math.cos(this.toRadians(angle));
  }

  static tangent(angle) {
    return Math.tan(this.toRadians(angle));
  }

  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

export default AdvancedFunctions;