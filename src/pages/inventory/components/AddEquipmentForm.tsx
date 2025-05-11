
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Equipo } from '@/services/equipmentService';
import { useIsMobile } from '@/hooks/use-mobile';

interface AddEquipmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newEquipo: Partial<Equipo>;
  setNewEquipo: (equipo: Partial<Equipo>) => void;
  onSubmit: (equipo: Partial<Equipo>) => void;
  isEdit?: boolean;
}

export const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  open,
  onOpenChange,
  newEquipo,
  setNewEquipo,
  onSubmit,
  isEdit = false
}) => {
  const isMobile = useIsMobile();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipo({
      ...newEquipo,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newEquipo);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-lg' : 'max-w-2xl'} max-h-[90vh] p-0`}>
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{isEdit ? 'Editar Equipo' : 'Añadir Nuevo Equipo'}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="hostname">Hostname</Label>
                <Input 
                  id="hostname" 
                  name="hostname" 
                  value={newEquipo.hostname || ''} 
                  onChange={handleChange} 
                  placeholder="Nombre del equipo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="ip">Dirección IP</Label>
                <Input 
                  id="ip" 
                  name="ip" 
                  value={newEquipo.ip || ''} 
                  onChange={handleChange} 
                  placeholder="192.168.1.1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="sede">Sede</Label>
                <Input 
                  id="sede" 
                  name="sede" 
                  value={newEquipo.sede || ''} 
                  onChange={handleChange} 
                  placeholder="Sede del equipo"
                />
              </div>
              
              <div>
                <Label htmlFor="area">Área</Label>
                <Input 
                  id="area" 
                  name="area" 
                  value={newEquipo.area || ''} 
                  onChange={handleChange} 
                  placeholder="Área o departamento"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="responsable">Responsable</Label>
                <Input 
                  id="responsable" 
                  name="responsable" 
                  value={newEquipo.responsable || ''} 
                  onChange={handleChange} 
                  placeholder="Nombre del responsable"
                />
              </div>
              
              <div>
                <Label htmlFor="mac">Dirección MAC</Label>
                <Input 
                  id="mac" 
                  name="mac" 
                  value={newEquipo.mac || ''} 
                  onChange={handleChange} 
                  placeholder="00:00:00:00:00:00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="procesador">Procesador</Label>
                <Input 
                  id="procesador" 
                  name="procesador" 
                  value={newEquipo.procesador || ''} 
                  onChange={handleChange} 
                  placeholder="Intel Core i5-10400"
                />
              </div>
              
              <div>
                <Label htmlFor="memoriaRam">Memoria RAM</Label>
                <Input 
                  id="memoriaRam" 
                  name="memoriaRam" 
                  value={newEquipo.memoriaRam || ''} 
                  onChange={handleChange} 
                  placeholder="8 GB"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="discoDuro">Disco Duro</Label>
                <Input 
                  id="discoDuro" 
                  name="discoDuro" 
                  value={newEquipo.discoDuro || ''} 
                  onChange={handleChange} 
                  placeholder="500 GB"
                />
              </div>
              
              <div>
                <Label htmlFor="tipoDisco">Tipo de Disco</Label>
                <Input 
                  id="tipoDisco" 
                  name="tipoDisco" 
                  value={newEquipo.tipoDisco || ''} 
                  onChange={handleChange} 
                  placeholder="SSD"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="activo">Activo Fijo</Label>
                <Input 
                  id="activo" 
                  name="activo" 
                  value={newEquipo.activo || ''} 
                  onChange={handleChange} 
                  placeholder="Número de activo fijo"
                />
              </div>
              
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input 
                  id="marca" 
                  name="marca" 
                  value={newEquipo.marca || ''} 
                  onChange={handleChange} 
                  placeholder="Dell, HP, Lenovo, etc."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="referencia">Referencia</Label>
                <Input 
                  id="referencia" 
                  name="referencia" 
                  value={newEquipo.referencia || ''} 
                  onChange={handleChange} 
                  placeholder="Modelo o referencia"
                />
              </div>
              
              <div>
                <Label htmlFor="serial">Serial</Label>
                <Input 
                  id="serial" 
                  name="serial" 
                  value={newEquipo.serial || ''} 
                  onChange={handleChange} 
                  placeholder="Número de serie"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="tipoEquipo">Tipo de Equipo</Label>
                <Input 
                  id="tipoEquipo" 
                  name="tipoEquipo" 
                  value={newEquipo.tipoEquipo || ''} 
                  onChange={handleChange} 
                  placeholder="Desktop, Laptop, Servidor"
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-6">
                <Switch 
                  id="monitor" 
                  checked={newEquipo.monitor || false}
                  onCheckedChange={(checked) => 
                    setNewEquipo({ ...newEquipo, monitor: checked })
                  }
                />
                <Label htmlFor="monitor">Incluye Monitor</Label>
              </div>
            </div>
            
            {newEquipo.monitor && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium text-gray-900 mb-2">Información del Monitor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monitorMarca">Marca</Label>
                    <Input 
                      id="monitorMarca" 
                      name="monitorMarca" 
                      placeholder="Dell, HP, LG, etc." 
                    />
                  </div>
                  <div>
                    <Label htmlFor="monitorActivo">Activo Fijo</Label>
                    <Input 
                      id="monitorActivo" 
                      name="monitorActivo" 
                      placeholder="Número de activo fijo" 
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </ScrollArea>
        
        <DialogFooter className="px-6 py-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {isEdit ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
