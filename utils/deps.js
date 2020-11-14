export default class Deps {    
  static #deps = [];

  static get(type) {
    try {
      return this.#deps.find(t => t instanceof type)
        ?? this.#add(new type());
    } catch { return null; }
  }

  static #add(instance) {
    this.#deps.push(instance);
    return instance;
  }
}
