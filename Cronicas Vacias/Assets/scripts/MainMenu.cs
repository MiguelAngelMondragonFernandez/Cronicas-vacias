using UnityEngine;
using UnityEngine.UI;

public class MainMenu : MonoBehaviour
{
    public GameObject mainMenuUI; // Reference to the main menu UI GameObject
    public GameObject menuManager;
    public GameObject settingsMenu;
    public Button settingsButton;
    public bool mainActive = true; // Flag to track if the menu is active
    public bool pausedActive = false; // Flag to track if the paused menu is active
    void ShowPausedMenu(){
        mainMenuUI.SetActive(false); // Hide the main menu UI
        GameObject newUI = Instantiate(settingsMenu, menuManager.transform);
        newUI.transform.SetParent(menuManager.transform);
    }
    void Awake()
    {
        settingsButton.onClick.AddListener(ShowPausedMenu);

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
