using System.Windows;

namespace DeviceSimulator.Services
{
    public class DialogService : IDialogService
    {
        /// <summary>
        /// Display an error dialog.
        /// </summary>
        /// <param name="title">Dialog title</param>
        /// <param name="text">Dialog text</param>
        public void ErrorBox(string title, string text)
        {
            MessageBox.Show(text, title, MessageBoxButton.OK, MessageBoxImage.Error);
        }

        /// <summary>
        /// Display an information dialog.
        /// </summary>
        /// <param name="title">Dialog title</param>
        /// <param name="text">Dialog text</param>
        public void InfoBox(string title, string text)
        {
            MessageBox.Show(text, title, MessageBoxButton.OK, MessageBoxImage.Information);
        }

        /// <summary>
        /// Display a warning dialog.
        /// </summary>
        /// <param name="title">Dialog title</param>
        /// <param name="text">Dialog text</param>
        public void WarningBox(string title, string text)
        {
            MessageBox.Show(text, title, MessageBoxButton.OK, MessageBoxImage.Warning);
        }
    }
}
