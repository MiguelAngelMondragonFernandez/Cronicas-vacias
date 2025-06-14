using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class TamañoDeLetra : MonoBehaviour
{
    public TMP_Dropdown dropdown;

    // Escalas para cada opción: chica, mediana, grande
    public float escalaChica = 0.8f;
    public float escalaMediana = 1f;
    public float escalaGrande = 1.3f;

    private Dictionary<TMP_Text, float> textosOriginales = new();

    void Start()
    {
        // Guardar tamaño original de todos los textos
        TMP_Text[] textos = GameObject.FindObjectsByType<TMP_Text>(FindObjectsSortMode.None);
        foreach (TMP_Text t in textos)
        {
            if (!textosOriginales.ContainsKey(t))
                textosOriginales[t] = t.fontSize;
        }

        dropdown.onValueChanged.AddListener(CambiarTamanoLetra);

        // Cargar preferencia guardada
        int opcionGuardada = PlayerPrefs.GetInt("TamanoLetra", 1); // Mediana por defecto
        dropdown.value = opcionGuardada;
        CambiarTamanoLetra(opcionGuardada);
    }

    public void CambiarTamanoLetra(int opcion)
    {
        float factor = 1f;

        switch (opcion)
        {
            case 0: factor = escalaChica; break;
            case 1: factor = escalaMediana; break;
            case 2: factor = escalaGrande; break;
        }

        PlayerPrefs.SetInt("TamanoLetra", opcion);
        PlayerPrefs.Save();

        foreach (var par in textosOriginales)
        {
            par.Key.fontSize = par.Value * factor;
        }
    }
}
