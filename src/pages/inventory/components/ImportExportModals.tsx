
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Upload, Download } from 'lucide-react';
import { exportInventory, importInventory } from '@/services/equipmentService';
import { useToast } from '@/hooks/use-toast';

interface ImportExportModalsProps {
  importModalOpen: boolean;
  setImportModalOpen: (open: boolean) => void;
  exportModalOpen: boolean;
  setExportModalOpen: (open: boolean) => void;
  confirmDeleteOpen: boolean;
  setConfirmDeleteOpen: (open: boolean) => void;
  onDeleteSelected: () => void;
  onImportComplete: () => void;
}

export const ImportExportModals: React.FC<ImportExportModalsProps> = ({
  importModalOpen,
  setImportModalOpen,
  exportModalOpen,
  setExportModalOpen,
  confirmDeleteOpen,
  setConfirmDeleteOpen,
  onDeleteSelected,
  onImportComplete
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = async (format: 'xlsx' | 'csv' | 'pdf') => {
    try {
      const blob = await exportInventory(format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventario_equipos.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportModalOpen(false);
      toast({
        title: "Exportación exitosa",
        description: "Los datos han sido exportados correctamente."
      });
    } catch (error) {
      console.error('Error exporting inventory:', error);
      toast({
        title: "Error en exportación",
        description: "Hubo un problema al exportar los datos.",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      importInventory(file).then(() => {
        setImportModalOpen(false);
        toast({
          title: "Importación exitosa",
          description: "Los datos han sido importados correctamente."
        });
        onImportComplete();
      }).catch(error => {
        console.error('Error importing inventory:', error);
        toast({
          title: "Error en importación",
          description: "Hubo un problema al importar los datos.",
          variant: "destructive"
        });
      });
    } catch (error) {
      console.error('Error importing inventory:', error);
      toast({
        title: "Error en importación",
        description: "Hubo un problema al importar los datos.",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    try {
      importInventory(file).then(() => {
        setImportModalOpen(false);
        toast({
          title: "Importación exitosa",
          description: "Los datos han sido importados correctamente."
        });
        onImportComplete();
      }).catch(error => {
        console.error('Error importing inventory:', error);
        toast({
          title: "Error en importación",
          description: "Hubo un problema al importar los datos.",
          variant: "destructive"
        });
      });
    } catch (error) {
      console.error('Error importing inventory:', error);
      toast({
        title: "Error en importación",
        description: "Hubo un problema al importar los datos.",
        variant: "destructive"
      });
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Import Modal */}
      <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Equipos</DialogTitle>
            <DialogDescription>
              Sube un archivo CSV o Excel con la información de los equipos.
            </DialogDescription>
          </DialogHeader>
          <div 
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-1">Arrastra y suelta tu archivo aquí</p>
            <p className="text-xs text-gray-400">o</p>
            <Button variant="outline" className="mt-2" onClick={openFileSelector}>
              Seleccionar archivo
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              style={{ display: 'none' }}
              accept=".csv,.xlsx,.xls"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportModalOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Inventario</DialogTitle>
            <DialogDescription>
              Selecciona el formato en el que deseas exportar los datos.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" className="justify-start text-left" onClick={() => handleExport('xlsx')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar como Excel (.xlsx)
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar como CSV (.csv)
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar como PDF (.pdf)
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportModalOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente los equipos seleccionados de nuestro servidor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteSelected} className="bg-red-500 hover:bg-red-600">
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
