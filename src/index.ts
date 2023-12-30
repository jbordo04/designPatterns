//Fabricas concretas o declaraciones explícitas de interfaces
interface Button {
  paint(): void;
}
interface Checkbox {
  paint(): void;
}

//Varientes explícitas
class WinButton implements Button {
  paint(): void {
    console.log("Representa un botón en estilo Windows");
  }
}
class MacButton implements Button {
  paint(): void {
    console.log("Representa un botón en estilo MacOs");
  }
}
class WinCheckbox implements Checkbox {
  paint(): void {
    console.log("Representa una casilla en estilo Windows");
  }
}
class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("Representa una casilla en estilo MacOs");
  }
}

//Interfaz para la Fábrica Abstracta
interface GUIFabrica {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

//Variantes Abstractas
class WinFabrica implements GUIFabrica {
  createButton(): Button {
    return new WinButton();
  }
  createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}
class MacFabrica implements GUIFabrica {
  createButton(): Button {
    return new MacButton();
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Cliente que utiliza la fábrica y los productos
class Application {
  private factory: GUIFabrica;
  private button!: Button;

  constructor(factory: GUIFabrica) {
    this.factory = factory;
  }

  createUI(): void {
    this.button = this.factory.createCheckbox();
  }

  paint(): void {
    this.button.paint();
  }
}

// Configurador de la aplicación que elige la fábrica
class ApplicationConfigurator {
  main(): void {
    const config = this.readApplicationConfigFile();

    let factory: GUIFabrica;

    if (config.OS === "Windows") {
      factory = new WinFabrica();
    } else if (config.OS === "Mac") {
      factory = new MacFabrica();
    } else {
      throw new Error("Error! Unknown operating system.");
    }

    const app = new Application(factory);
    app.createUI();
    app.paint();
  }

  private readApplicationConfigFile(): { OS: string } {
    // Implementar la lectura de la configuración desde el archivo (simulado aquí como un objeto con propiedad OS)
    return { OS: "Mac" };
  }
}

// Inicio de uso
const configurator = new ApplicationConfigurator();
configurator.main();
