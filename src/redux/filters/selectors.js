import { createSelector } from "@reduxjs/toolkit";
import { selectCampers } from "../campers/selectors";

const selectFilters = (state) => state.filters;

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    const filteredCampers = campers.filter((camper) => {
      const matchesEquipments = Object.keys(filters.equipments).every((key) => {
        if (
          filters.equipments[key] === false ||
          filters.equipments[key] === ""
        ) {
          return true;
        }
        if (typeof filters.equipments[key] === "boolean") {
          return camper[key] === filters.equipments[key];
        }
        if (typeof filters.equipments[key] === "string") {
          return camper[key]
            .toLowerCase()
            .includes(filters.equipments[key].toLowerCase());
        }
        return true;
      });

      const selectedForms = Object.keys(filters.forms).filter(
        (key) => filters.forms[key]
      );

      const matchesForms =
        selectedForms.length === 0 || selectedForms.includes(camper.form);

      const matchesLocation =
        filters.location === "" ||
        camper.location.toLowerCase().includes(filters.location.toLowerCase());

      const matches = matchesEquipments && matchesForms && matchesLocation;

      return matches;
    });

    return filteredCampers;
  }
);

export const selectCategory = (state) => state.filters.equipments;
