using UnityEngine;

public class Character
{
    public string Name { get; set; }
    public string State { get; set; }
    public string[] Lines { get; set; }
    public string ImgStates { get; set; }
    public bool IsTalking { get; set; } = false;
    public bool IsVisible { get; set; } = false;

    public Character(string name, string state, string[] lines, string imgStates, bool isTalking, bool isVisible)
    {
        Name = name;
        State = state;
        Lines = lines;
        ImgStates = imgStates;
        IsTalking = isTalking;
        IsVisible = isVisible;
    }
}