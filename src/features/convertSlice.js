import { createSlice } from "@reduxjs/toolkit";

const conversion = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    value: "",
  },
  reducers: {
    romanToDecimal: (state, actions) => {
      let arr = actions.payload.split("");

      let total = 0;
      let current, currentValue, next, nextValue;

      for (let i = 0; i < arr.length; i++) {
        current = arr[i];
        currentValue = conversion[current];

        next = arr[i + 1];
        nextValue = conversion[next];

        if (currentValue < nextValue) {
          total -= currentValue;
        } else {
          total += currentValue;
        }
      }
      state.value = total;
    },
    decimalToRoman: (state, actions) => {
      state.value = "12345";
      let values = [1, 5, 10, 50, 100, 500, 1000],
        letras = ["I", "V", "X", "L", "C", "D", "M"],
        res = [],
        num,
        letra,
        val,
        pos,
        insert;

      for (let i = 6; (num = values[i]) && (letra = letras[i]); i--) {
        // Suficientemente grande
        if (actions.payload >= num) {
          // Número de letras repetidas
          let r = Math.floor(actions.payload / num);

          // Restamos el actual
          actions.payload -= r * num;

          if (r < 4) {
            // Metemos las letras
            while (r--) {
              res.push(letra);
            }
          } else {
            // No se pueden repetir 4+ veces
            val = res.pop(); // Última letra

            // Si es el string vacío o letra == "M" (no hay anterior)
            // usamos la letra anterior a esta
            pos = (val ? letras.indexOf(val) : i) + 1;

            // Y si letra == "M" -> letras[pos] no existirá y usamos M
            insert = letra + (letras[pos] || "M");

            // Insertamos el string
            res.push(insert);
          }
        } else {
          // Si no vamos a poner letra usamos un ""
          // para que no afecte pop
          res.push("");
        }
      }

      state.value = res.join("");
    },
  },
});

export const { romanToDecimal, decimalToRoman } = convertSlice.actions;

export default convertSlice.reducer;
