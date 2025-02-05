import axios from "axios";

const PointService = {
  async getPoints({searchTerm}) {
    const data =  [
        { id: 1, content: "Developed a full-stack application", keywords: ["React", "Node.js"], section: "summary" },
        { id: 2, content: "Worked on microservices architecture", keywords: ["Java", "Spring Boot"], section: "experience" },
        { id: 3, content: "Implemented CI/CD pipelines", keywords: ["DevOps", "Jenkins"], section: "experience" }
      ]
    const filteredPoints = data.filter((point) =>
        point.content.toLowerCase().includes(searchTerm?.toLowerCase() || '')
      );
    return Promise.resolve({
      points: filteredPoints
    });
  },
  async addPoint(point) {
    console.log("point added")
    return Promise.resolve({ data: { ...point, id: Date.now() } });
  },

  async deletePoint(id) {
    return Promise.resolve({ data: { success: true } });
  },
};

export default PointService;