namespace DeviceSimulator.Services
{
    public interface IDialogService
    {
        void InfoBox(string title, string text);

        void ErrorBox(string title, string text);

        void WarningBox(string title, string text);
    }
}
