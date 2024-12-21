import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { uploadDocumentsSchema, UploadDocumentsSchema } from '../../schemas/registerUser';
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { postFiles } from '../../../../services/api';

interface Props {
    idUser: string | number;
}

const UserDocuments = ({ idUser }: Props) => {
    const form = useForm<UploadDocumentsSchema>({
        resolver: zodResolver(uploadDocumentsSchema),
        defaultValues: {
            documents: [
                {
                    NombreDocumento: 'contrato',
                    file: undefined,
                    TipoDocumento: 'contrato',  // Agregar el campo TipoDocumento
                },
                {
                    NombreDocumento: 'dni',
                    file: undefined,
                    TipoDocumento: 'dni',  // Agregar el campo TipoDocumento
                },
                {
                    NombreDocumento: 'declaracion',
                    file: undefined,
                    TipoDocumento: 'declaracion',  // Agregar el campo TipoDocumento
                },
                {
                    NombreDocumento: 'fachada',
                    file: undefined,
                    TipoDocumento: 'fachada',  // Agregar el campo TipoDocumento
                },
                {
                    NombreDocumento: 'test',
                    file: undefined,
                    TipoDocumento: 'test',  // Agregar el campo TipoDocumento
                },
                {
                    NombreDocumento: 'serial',
                    file: undefined,
                    TipoDocumento: 'serial',  // Agregar el campo TipoDocumento
                },
            ],
        }
    });
    
    const { fields } = useFieldArray({
        control: form.control,
        name: 'documents',
    })

    const onSubmit = (data: UploadDocumentsSchema) => {
        console.log("Formulario enviado", data);
        const formData = new FormData();
        data.documents.forEach(d => {
            if (d.file) {
                formData.append(d.NombreDocumento, d.file);
            }
           
            if (d.TipoDocumento) {
                formData.append(d.NombreDocumento + '_TipoDocumento', d.TipoDocumento);
            }
        });

        postFiles("api/v1/document/upload/"+idUser, formData);
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={field.id} className="my-5">
                        <FormField
                            control={form.control}
                            name={`documents.${index}.file`}
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>{field.NombreDocumento}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldValues}
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                fieldValues.onChange(file);
                                            }}
                                            className='border-gray-500 dark:border-gray-800'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Campo adicional para TipoDocumento */}
                        <FormField
                            control={form.control}
                            name={`documents.${index}.TipoDocumento`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Documento</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Especifica el tipo de documento"
                                            className='border-gray-500 dark:border-gray-800'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                <div className='flex justify-end items-center'>
                    <Button type="submit">Guardar documentos</Button>
                </div>
            </form>
        </Form>
    );
};

export default UserDocuments