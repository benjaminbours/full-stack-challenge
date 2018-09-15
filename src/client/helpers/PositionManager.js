export default class PositionManager {
  static async loadPosition() {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      console.log(position.coords);
      return { latitude, longitude };
    } catch (error) {
      return error;
    }
  }

  static getCurrentPosition = (options = {}) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}
