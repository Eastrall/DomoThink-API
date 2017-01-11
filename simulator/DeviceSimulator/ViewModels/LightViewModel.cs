using DeviceSimulator.Client;
using DeviceSimulator.Services;
using DeviceSimulator.ViewModels.Framework;
using System;
using System.Threading;

namespace DeviceSimulator.ViewModels
{
    public class LightViewModel : ViewModelBase
    {
        private IDialogService dialogService;
        private LightClient client;
        private Thread clientThread;

        public LightViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;

            try
            {
                this.client = new LightClient();
                this.client.Connect("127.0.0.1", 4444);

                this.clientThread = new Thread(this.client.Run);
                this.clientThread.Start();
            }
            catch (Exception e)
            {
                this.dialogService.ErrorBox("Connection error", "Cannot connect to the simulator server.\n" + e.Message);
            }
        }

        public void Dispose()
        {
            this.client.Disconnect();
            this.client.Dispose();
            this.clientThread.Join();
        }
    }
}
