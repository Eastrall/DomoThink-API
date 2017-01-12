using DeviceSimulator.Client;
using DeviceSimulator.Models;
using DeviceSimulator.Packets;
using DeviceSimulator.Services;
using DeviceSimulator.ViewModels.Framework;
using System;
using System.Diagnostics;
using System.Threading;

namespace DeviceSimulator.ViewModels
{
    public class LightViewModel : ViewModelBase
    {
        private bool state;

        private IDialogService dialogService;
        private LightClient client;
        private Thread clientThread;

        public ConnectedObject Object { get; private set; }

        public bool Status
        {
            get { return this.state; }
            set { this.NotifyPropertyChanged(ref this.state, value); }
        }

        public LightViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;
            this.Status = false;

            this.Object = new ConnectedObject()
            {
                Name = "LIGHT_XBZF_37",
                Type = 1,
                State = 0,
                Protocole = "SIMULATOR",
                Id = 35432
            };

            try
            {
                this.client = new LightClient();
                this.client.OnIncomingData += Client_OnIncomingData;
                this.client.Connect("127.0.0.1", 4444);

                this.clientThread = new Thread(this.client.Run);
                this.clientThread.Start();
            }
            catch (Exception e)
            {
                this.dialogService.ErrorBox("Connection error", "Cannot connect to the simulator server.\n" + e.Message);
            }
        }

        private void Client_OnIncomingData(dynamic data)
        {
            int header = data.header;

            switch (header)
            {
                case 0x00:
                    ObjectPackets.SendDeviceInformations(this.client, this.Object);
                    break;

                case 0x02:
                    bool status = data.message;
                    this.Status = status;
                    break;

                default:
                    Debug.WriteLine("Unknow packet header: {0}", header);
                    break;
            }
        }

        public void Dispose()
        {
            this.client.Disconnect();
            this.client.Dispose();
            this.clientThread?.Join();
        }
    }
}
