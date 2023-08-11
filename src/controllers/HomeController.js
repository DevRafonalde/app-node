class HomeController {
    async index(req, res) {
        res.json("Home Index");
    }
}

export default new HomeController();