using DeviceSimulator.Client;
using DeviceSimulator.ViewModels.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DeviceSimulator.ViewModels
{
    public class LightViewModel : ViewModelBase
    {
        private LightClient client;
        private Thread clientThread;

        public LightViewModel()
        {
            this.client = new LightClient();
            this.client.Connect("127.0.0.1", 4444);

            this.clientThread = new Thread(this.client.Run);
            this.clientThread.Start();
        }

        public void Dispose()
        {
            this.client.Disconnect();
            this.client.Dispose();
            this.clientThread.Join();
        }
    }
}
