using TMPro;
using UnityEngine;
using System.Collections;
using System.IO;
using System.Text;
using System.Collections.Generic;

public class TextsLogiic : MonoBehaviour
{
    public Canvas canvas;
    public TMP_FontAsset fontAsset;
    private TextMeshProUGUI textBox;
    public GameObject SaveHistory;
    private float timeToWait = 0.05f;
    public bool isTyping { get; set; } = false;
    public List<string> history = new List<string>();

    public void SaveDialogueHistory(string chapterName)
    {
        HistorySave data = new HistorySave();
        data.history = history;

        string json = JsonUtility.ToJson(data, true);
        // Ruta de guardado (puedes cambiarla si quieres)
        string path = Application.persistentDataPath + "/" + chapterName + "_dialogues.json";

        File.WriteAllText(path, json, Encoding.UTF8);

        Debug.Log("Dialogues saved to: " + path);
    }

    public void LoadDialogueHistory(string chapterName)
    {
        string path = Application.persistentDataPath + "/" + chapterName + "_dialogues.json";

        if (File.Exists(path))
        {
            string json = File.ReadAllText(path, Encoding.UTF8);
            HistorySave data = JsonUtility.FromJson<HistorySave>(json);

            history = data.history;

            Debug.Log("Dialogues loaded! Total: " + history.Count);
        }
        else
        {
            Debug.LogWarning("No saved dialogues found for chapter: " + chapterName);
        }
    }

    public void Awake()
    {
        GameObject dialogBox = new GameObject("DialogBox");
        dialogBox.transform.SetParent(canvas.transform, false);

        TextMeshProUGUI tmp = dialogBox.AddComponent<TextMeshProUGUI>();
        tmp.fontSize = 55;
        tmp.color = Color.white;
        tmp.alignment = TextAlignmentOptions.TopLeft;

        RectTransform rect = tmp.GetComponent<RectTransform>();
        rect.anchoredPosition = new Vector2(100, 500);
        rect.sizeDelta = new Vector2(1850, 200);

        if (fontAsset != null)
            tmp.font = fontAsset;

        textBox = tmp;
    }

    public void StartTyping(string text)
    {
        if (isTyping)
        {
            timeToWait = 0.00f;
        }
        else { 
        StopAllCoroutines();
            textBox.text += "";
        StartCoroutine(TypeText(text));
        history.Add(text);
        }
    }

    private IEnumerator TypeText(string text)
    {
        isTyping = true;
        foreach (char letter in text)
        {
            textBox.text += letter;
            yield return new WaitForSeconds(timeToWait);
        }
        isTyping = false;
        timeToWait = 0.05f;
    }

    public void Dialog(object[] scene, int position)
    {
        object[] characterData = (object[])scene[position];
        Character character = (Character)characterData[0];
            int lineIndex = (int)characterData[1];

        if (character.Lines.Length > lineIndex)
        {
            string line = character.Lines[lineIndex];
            if (character.Name == "narrador")
            {
                StartTyping(line+"\n");
            }
            else { 
                StartTyping(character.Name + ": " + line+"\n");
            }
        }
    }


}
