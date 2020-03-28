import { isEqual } from "lodash";

/** The maximum number of graphs that can be displayed. */
const MAX_GRAPHS = 4;
class ConfigManager {
  config = require("./config.json");
  graphID = this.config.graphs.length;

  /**
   * Unique ID generator for graphs
   */
  getGraphID = () => {
    const ID = this.graphID;
    this.graphID = ID + 1;
    return ID;
  };

  /**
   * GRAPH HANDLERS
   */
  addGraph = () => {
    if (this.config.graphs.length >= MAX_GRAPHS) {
      console.error(`Maximum number of graphs (${MAX_GRAPHS}) reached!`);
      return;
    }
    this.config.graphs.push({
      ID: this.getGraphID(),
      paths: []
    });
  };

  removeGraph = ID => {
    console.log(`Removing graph ${ID}`);
    this.config.graphs = this.config.graphs.filter(graph => graph.ID !== ID);
  };

  /**
   * PATH HANDLERS
   */
  handlePath = (path, currentGraph) => {
    if (this.isPathSelected(path, currentGraph)) {
      this.removePath(path, currentGraph);
    } else {
      this.addPath(path, currentGraph);
    }
  };

  addPath = (path, currentGraph) => {
    this.config.graphs
      .find(graph => graph.ID === currentGraph)
      .paths.push(path);
  };

  removePath = (path, currentGraph) => {
    this.config.graphs.find(
      graph => graph.ID === currentGraph
    ).paths = this.config.graphs
      .find(graph => graph.ID === currentGraph)
      .paths.filter(p => !isEqual(p, path));
  };

  isPathSelected = (path, currentGraph) => {
    try {
      return (
        this.config.graphs
          .find(graph => graph.ID === currentGraph)
          .paths.filter(p => isEqual(p, path)).length > 0
      );
    } catch (err) {
      return false;
    }
  };

  /*
   * CONFIG HANDLERS
   */
  getConfig = () => {
    return this.config;
  };

  setConfig = data => {
    try {
      const config = JSON.parse(data);
      this.config = config;
    } catch (err) {
      console.error(err);
    }
  };

  shouldEnableAdd = () => {
    return this.state.graphs.length < MAX_GRAPHS;
  };
}

export default new ConfigManager();
