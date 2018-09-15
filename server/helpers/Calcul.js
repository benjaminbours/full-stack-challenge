class Calcul {
  static degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  static distanceBeetweenPoint(point1, point2) {
    const R = 6371; // Radius of the earth in km
    const lat1 = this.degreesToRadians(point1.latitude);
    const lat2 = this.degreesToRadians(point2.latitude);
    const dLat = this.degreesToRadians((point2.latitude - point1.latitude));
    const dLong = this.degreesToRadians((point2.longitude - point1.longitude));

    const a = (
      Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.sin(dLong / 2) * Math.sin(dLong / 2)
    );
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return Math.round(d * 100) / 100;
  }
}

module.exports = Calcul;
