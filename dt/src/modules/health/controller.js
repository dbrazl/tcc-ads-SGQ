import HTTP_STATUS from "../../config/htttpStatus";

class HealthController {
  async health(request, response) {
    return response.status(HTTP_STATUS.OK).json({
      application: 'on'
    });
  }
}

export default new HealthController();
