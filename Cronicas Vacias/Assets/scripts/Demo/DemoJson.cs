using System.IO;
using System.Text;
using UnityEngine;
using UnityEngine.UI;

public class DemoJson : MonoBehaviour
{

    public new string name = "";
    public Button button;
    public GameObject prefabPrueba;
    public GameObject mainObject;
    public Button buttonprefab;
    private bool prefabExist; 

    public void CreatePrefab() {
        Instantiate(prefabPrueba, mainObject.transform);
        prefabPrueba.transform.SetParent(mainObject.transform);
        prefabExist = true;
    }

    public Character personaje = new(
        "narrador", //nombre
        "Feliz", //estado
        new string[]
        {
            "Intento numero de dialogos", 
            "Intento numero dos de dialogos", 
            "Intento numero de dialogos", 
            "Intento numero dos de dialogos Largo de manera" +
            " innecesaria, por lo que se va a intentar hacer" +
            " un gran dialogo" 
        }, //lineas
            "igm/pathImgage",
            true, true
        );

    public void SaveJson(string nameFile) { 
        ObjectTest objectTest = new ObjectTest();
        objectTest.Name = name;
        objectTest.Character = personaje;
        Debug.Log("Guardando Json..."+ objectTest.Name);
        string json = JsonUtility.ToJson(objectTest, true);
        Debug.Log(json);
        string path = Application.persistentDataPath + "/" + nameFile + ".json";

        File.WriteAllText(path, json, Encoding.UTF8);

        Debug.Log("Json guardado en:\n " + path);
    }

    public void LoadJson(string nameFile)
    {
        string path = Application.persistentDataPath + "/" + nameFile + ".json";
        if (!File.Exists(path))
        {
            Debug.LogWarning("No existe el archivo Json en la ruta: " + path);
            return;
        }
        else {
            string json = File.ReadAllText(path);
            ObjectTest objectTest = JsonUtility.FromJson<ObjectTest>(json);

            Debug.Log("Json cargado");
        }
    }

    public void Start()
    {
        button.onClick.AddListener(() => SaveJson(name));
        buttonprefab.onClick.AddListener(() => CreatePrefab());
    }

    void Update()
    {
        // Aquí puedes agregar lógica que necesites en cada frame
        if (Input.GetKeyDown(KeyCode.Q)) {
            if(!prefabExist)
                CreatePrefab();
        }
    }


}
