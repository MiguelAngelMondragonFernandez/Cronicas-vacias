using UnityEngine;
using UnityEngine.UI;

public class DemoPrefab : MonoBehaviour
{
    /*
    public Button btnClosePrefab;
    public GameObject prefab;


    public void ClosePrefab()
    {
        Destroy(prefab.gameObject);
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        Debug.Log("Hola mundo");
        btnClosePrefab.onClick.AddListener(()=> ClosePrefab());
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }*/

    public Button btnClosePrefab;
    public GameObject prefab;

    public void ClosePrefab() {
        Destroy(prefab.gameObject);
    }

    private void Start()
    {
        Debug.Log("Hola mundo");
        btnClosePrefab.onClick.AddListener(() => ClosePrefab());
    }


}
