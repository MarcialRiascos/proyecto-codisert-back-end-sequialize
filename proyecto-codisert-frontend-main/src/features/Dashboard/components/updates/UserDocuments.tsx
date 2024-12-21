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
                },
                {
                    NombreDocumento: 'dni',
                    file: undefined,
                },
                {
                    NombreDocumento: 'declaracion',
                    file: undefined,
                },
                {
                    NombreDocumento: 'fachada',
                    file: undefined,
                },
                {
                    NombreDocumento: 'test',
                    file: undefined,
                },
                {
                    NombreDocumento: 'serial',
                    file: undefined,
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
        data.documents.map(d=>{
            formData.append(d.NombreDocumento, d.file);
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
                    </div>
                ))}
                <div className='flex justify-end items-center'>
                    <Button type="submit">Guardar documentos</Button>
                </div>
            </form>
        </Form>
    )
}

export default UserDocuments