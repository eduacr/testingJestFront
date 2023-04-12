import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryContainer from "../Components/homePage/categorySection/CategoryContainer";

describe("CategoryContainer", () => {
  // Creamos algunas categorías de prueba y una función simulada para manejar la selección de categorías
  const categorys = [
    { id: 1, nombre: "Categoría 1" },
    { id: 2, nombre: "Categoría 2" },
    { id: 3, nombre: "Categoría 3" },
  ];

  const handleSelectCategory = jest.fn();

  it("renderiza las cartas de categoría cuando se proporcionan categorías", () => {
    render(
      <CategoryContainer
        categorySelected={null}
        handleSelectCategory={handleSelectCategory}
        categorys={categorys}
      />
    );

    // Verifica que se rendericen los elementos esperados en el componente
    expect(screen.getByText("Busca por tipo de alojamiento")).toBeInTheDocument();
    expect(screen.getByText("Categoría 1")).toBeInTheDocument();
    expect(screen.getByText("Categoría 2")).toBeInTheDocument();
    expect(screen.getByText("Categoría 3")).toBeInTheDocument();
  });

  it("llama a la función para manejar la selección de categoría cuando se hace clic en una carta de categoría", () => {
    render(
      <CategoryContainer
        categorySelected={null}
        handleSelectCategory={handleSelectCategory}
        categorys={categorys}
      />
    );

    // Hacemos clic en una carta de categoría
    const categoryCard = screen.getByText("Categoría 2");
    userEvent.click(categoryCard);

    // Verifica que la función para manejar la selección de categoría se haya llamado con la categoría seleccionada
    expect(handleSelectCategory).toHaveBeenCalledWith(categorys[1]);
  });

  it("renderiza un mensaje de error cuando no se proporcionan categorías", () => {
    render(
      <CategoryContainer
        categorySelected={null}
        hadleSelectCategory={handleSelectCategory}
        categorys={[]}
      />
    );

    // Verifica que se renderice el mensaje de error cuando no hay categorías
    expect(screen.getByText("Ha ocurrido un error, por favor vuelva a intetar más tarde")).toBeInTheDocument();
  });
});
