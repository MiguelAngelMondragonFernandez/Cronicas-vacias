using System.Collections;
using TMPro;
using UnityEngine;
// import util.xx.xx
//using xx.xx.xx;

public class Demo : MonoBehaviour
{
    public Canvas espacio;
    private TextMeshProUGUI texto;
    public GameObject textbox;
    public string textoUI = "";
    public bool isTyping { get; set; } = false;


    public IEnumerator TypeWritter(string textCompleto) {
        isTyping = true;
        foreach(char letter in textCompleto) {
            texto.text += letter;
            yield return new WaitForSeconds(0.05f);
        }
        isTyping = false;
    }

    public void StartTyping(string text) {
        if (!isTyping) {
            StopAllCoroutines();
            texto.text += "";
            StartCoroutine(TypeWritter(text));
        }
    }

    // Awake is called before the first frame update and start
    void Awake()
    {
        textbox.transform.SetParent(espacio.transform, false);
        texto = textbox.AddComponent<TextMeshProUGUI>();
        texto.fontSize = 55;
        texto.color = Color.white;
        texto.alignment = TextAlignmentOptions.TopLeft;
        RectTransform rect = texto.GetComponent<RectTransform>();
        rect.sizeDelta = new Vector2(250, 250);
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        StartTyping(textoUI);

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
