
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Upload, Download } from 'lucide-react';

interface ImportExportModalsProps {
  importModalOpen: boolean;
  setImportModalOpen: (open: boolean) => void;
  exportModalOpen: boolean;
  setExportModalOpen: (open: boolean) => void;
  confirmDeleteOpen: boolean;
  setConfirmDeleteOpen: (open: boolean) => void;
  onImport: () => void;
  onExport: () => void;
  onDeleteSelected: () => void;
}

export const ImportExportModals: React.FC<ImportExportModalsProps> = ({
  importModalOpen,
  setImportModalOpen,
  exportModalOpen,
  setExportModalOpen,
  confirmDeleteOpen,
  setConfirmDeleteOpen,
  onImport,
  onExport,
  onDeleteSelected
}) => {
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
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-1">Arrastra y suelta tu archivo aquí</p>
            <p className="text-xs text-gray-400">o</p>
            <Button variant="outline" className="mt-2">Seleccionar archivo</Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportModalOpen(false)}>Cancelar</Button>
            <Button onClick={onImport} className="bg-envio-blue hover:bg-envio-blue/90">
              Importar
            </Button>
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
            <Button variant="outline" className="justify-start text-left" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar como Excel (.xlsx)
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar como CSV (.csv)
            </Button>
            <Button variant="outline" className="justify-start text-left" onClick={onExport}>
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
