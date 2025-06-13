using UnityEngine;

public class Settings : MonoBehaviour
{
    public GameObject canvas;
    bool isActive = true;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Awake()
    {
        canvas.SetActive(isActive);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
