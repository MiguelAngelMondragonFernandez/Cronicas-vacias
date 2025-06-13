using UnityEngine;
using UnityEngine.UI;

public class PauseMenu : MonoBehaviour
{
    public GameObject pauseMenuUI; // Reference to the pause menu UI GameObject
    public Button btnContinue;
    public Button btnSave;
    public Button btnLoad;
    public Button btnQuit;
    public Button btnSettings;
    public Button btnShowHistory;
    public static bool isPaused = false; // Flag to check if the game is paused
    // Start is called once before the first execution of Update after the MonoBehaviour is created

    void Resume() {
        isPaused = false;
        pauseMenuUI.SetActive(false); // Hide the pause menu
        Time.timeScale = 1f; // Resume the game time
    }

    void SaveGame()
    {
        // Implement save game logic here
        Debug.Log("Game Saved");
    }

    void LoadGame()
    {
        // Implement load game logic here
        Debug.Log("Game Loaded");
    }

    void QuitGame()
    {
        // Implement quit game logic here
        Debug.Log("Game Quit");
    }

    void ShowHistory()
    {
        // Implement show history logic here
        Debug.Log("Showing History");
    }

    void Settings()
    {
        // Implement settings logic here
        Debug.Log("Settings");
    }

    void Awake()
    {
        pauseMenuUI.SetActive(false); // Ensure the pause menu is hidden at the start
        btnContinue.onClick.AddListener(Resume); // Add listener for continue button
        btnSave.onClick.AddListener(SaveGame); // Add listener for save button
        btnLoad.onClick.AddListener(LoadGame); // Add listener for load button
        btnQuit.onClick.AddListener(QuitGame); // Add listener for quit button
        btnSettings.onClick.AddListener(Settings); // Add listener for settings button
        btnShowHistory.onClick.AddListener(ShowHistory); // Add listener for show history button
        // Add listener for the escape key to toggle pause menu
    }

    // Update is called once per frame
    void Update()
    {
        // Check if the "Escape" key is pressed
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            // Toggle the pause state
            if (isPaused)
            {
                pauseMenuUI.SetActive(false); // Hide the pause menu
                Debug.Log("Hello Unhappy");
                isPaused = false;
            }
            else {
                pauseMenuUI.SetActive(true); // Show the pause menu
                Debug.Log("Hello Happy");
                isPaused = true;
            }
        }

    }
}
