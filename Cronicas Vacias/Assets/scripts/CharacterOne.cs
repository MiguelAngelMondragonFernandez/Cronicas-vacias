using System;
using UnityEngine;

public class Scene1 : MonoBehaviour
{
    public TextsLogiic texts;
    private int positionCurrency = 0;
    public GameObject canvas;
    public GameObject textSquare;
    public UnityEngine.UI.Image background;
    bool autoModeActive = false;
    public static Character character1 = new(
        "narrador", //nombre
        "Feliz", //estado
        new string[]
        {
            "Intento numero de dialogos", "Intento numero dos de dialogos", "Intento numero de dialogos", "Intento numero dos de dialogos Largo de manera innecesaria, por lo que se va a intentar hacer un gran dialogo" }, //lineas
            "", //imagenes de estado
        true, //si el personaje habla
        true //si el personaje es visible
        );
    public static Character character2 = new(
       "personaje2", //nombre
       "Feliz", //estado
       new string[]
       {
            "Intento numero de dialogos", "Intento numero dos de dialogos","Intento numero de dialogos", "Intento numero dos de dialogos" }, //lineas
            "", //imagenes de estado
       true, //si el personaje habla
       true //si el personaje es visible
       );

    public object[] scene;


    private void ChangeBackgroundImage()
    {
        Sprite mySprite = Resources.Load<Sprite>("Images/Fondo1");
        if (mySprite != null) {
            background.sprite = mySprite;
        }

    }

    void SetUIActive(bool isActive)
    {
        autoModeActive = false; // Desactivar el modo automático al mostrar la UI
        canvas.SetActive(isActive);
        textSquare.SetActive(isActive);
    }


    private Character ChangeProperties(Character character,
        string state = null,
        string[] lines = null,
        string imgState = null,
        bool? isTalking = null,
        bool? isVisible = null
        )
    {
        if (state != null) character.State = state;
        if (lines != null) character.Lines = lines;
        if (imgState != null) character.ImgStates = imgState;
        if (isTalking != null) character.IsTalking = isTalking.Value;
        if (isVisible != null) character.IsVisible = isVisible.Value;
        return character;
    }

    void Awake()
    {
    scene = new object[]
        {
            //personaje, estado, dialogo, imgestado, habla, visible, imgFondo
            new object[] { character1, 0 },
            new object[] { character2, 1 },
            new object[] { character2, 0 },
            new object[] { character1, 1 },
            new object[] { character1, 2 },
            new object[] { ChangeProperties(character: character1, state: "Hola mundo"), 3 },
            new object[] { ChangeProperties(character: character1, state: "Hola mundo"), 0 },
        };
    }

    private float autoModeCooldown = 1.5f; // Tiempo de espera en segundos
    private float lastAutoModeTime = 0f;
    

    void Start()
    {
        ChangeBackgroundImage();
        texts.Dialog(scene, positionCurrency);
    }

void AutoMode()
    {
        if (texts.isTyping)
        {
            lastAutoModeTime = Time.time; // Reiniciar el temporizador si se está escribiendo
            return; // Si el texto se está escribiendo, no avanzar
        }

        if (Time.time - lastAutoModeTime >= autoModeCooldown)
        {
            if (positionCurrency < scene.Length - 1)
            {
                positionCurrency++;
                texts.Dialog(scene, positionCurrency);
            }
            else
            {
                autoModeActive = false; // Desactivar el modo automático si no hay más diálogos
            }
            lastAutoModeTime = Time.time; // Actualizar el tiempo del último AutoMode
        } 
    }
    // Update is called once per frame  
    void Update()
    {
        if (autoModeActive) {
            AutoMode();
        }

        if (Input.GetKeyDown(KeyCode.UpArrow) ||
            Input.GetKeyDown(KeyCode.DownArrow) ||
            Input.GetKeyDown(KeyCode.RightArrow) ||
            Input.GetKeyDown(KeyCode.A) 
            ){

            KeyCode pressedKey = KeyCode.None;

            if (Input.GetKeyDown(KeyCode.UpArrow)) pressedKey = KeyCode.UpArrow;
            else if (Input.GetKeyDown(KeyCode.DownArrow)) pressedKey = KeyCode.DownArrow;
            else if (Input.GetKeyDown(KeyCode.RightArrow)) pressedKey = KeyCode.RightArrow;
            else if (Input.GetKeyDown(KeyCode.A)) pressedKey = KeyCode.A;

            switch (pressedKey)
            {
                case KeyCode.UpArrow:
                    SetUIActive(false);
                    break;

                case KeyCode.DownArrow:
                    SetUIActive(true);
                    break;

                case KeyCode.RightArrow:
                    autoModeActive = false; // Desactivar el modo automático al avanzar
                    if (positionCurrency < scene.Length - 1)
                    {
                        positionCurrency++;
                        texts.Dialog(scene, positionCurrency);
                    }
                    break;
                case KeyCode.A:
                    autoModeActive = !autoModeActive;
                    break;
            }
        }
    }

}
