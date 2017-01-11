using DeviceSimulator.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.ComponentModel;
using DeviceSimulator.Services;

namespace DeviceSimulator
{
    public partial class MainWindow : Window
    {
        private LightViewModel lightViewModel;
        private IDialogService dialogService;

        public MainWindow()
        {
            this.dialogService = new DialogService();
            this.lightViewModel = new LightViewModel(this.dialogService);

            this.InitializeComponent();
            this.DataContext = this.lightViewModel;
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            this.lightViewModel.Dispose();

            base.OnClosing(e);
        }
    }
}
