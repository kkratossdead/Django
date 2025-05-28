import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, ArrowLeft, Save, X } from 'lucide-react';

const statusConfig = {
  open: { label: 'Ouvert', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  closed: { label: 'Fermé', color: 'bg-green-100 text-green-800 border-green-200' }
};

function TicketEdit() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'open'
    }
  });

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tickets/${id}/`, {
          headers: {
            'Authorization': token ? `Token ${token}` : ''
          }
        });

        if (!response.ok) {
          throw new Error('Impossible de charger le ticket');
        }

        const data = await response.json();
        setTicketData(data);
        form.reset({
          title: data.title,
          description: data.description,
          status: data.status
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [id, token, form]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8000/api/tickets/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Token ${token}` : ''
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Vous n'avez pas le droit de modifier ce ticket.");
      }

      setSuccess(true);
      setTimeout(() => navigate(`/tickets/details/${id}`), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-white/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Modifier le ticket
              </h1>
              <p className="text-slate-600 mt-1">Ticket #{id}</p>
            </div>
          </div>
          {ticketData && (
            <Badge className={statusConfig[ticketData.status]?.color}>
              {statusConfig[ticketData.status]?.label}
            </Badge>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50/80 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50/80 backdrop-blur-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              Ticket modifié avec succès ! Redirection en cours...
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Informations du ticket</CardTitle>
                <CardDescription className="text-blue-100">
                  Modifiez les informations du ticket et enregistrez vos changements.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{ 
                        required: "Le titre est obligatoire",
                        minLength: { value: 3, message: "Le titre doit contenir au moins 3 caractères" }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-700">
                            Titre du ticket
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Décrivez brièvement le problème..."
                              className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      rules={{ 
                        required: "La description est obligatoire",
                        minLength: { value: 10, message: "La description doit contenir au moins 10 caractères" }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-700">
                            Description détaillée
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Décrivez le problème en détail, les étapes pour le reproduire, l'impact, etc..."
                              rows={8}
                              className="text-base border-2 focus:border-blue-500 transition-colors resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-slate-700">
                            Statut du ticket
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-2 focus:border-blue-500">
                                <SelectValue placeholder="Sélectionner un statut" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Ouvert
                                </div>
                              </SelectItem>
                              <SelectItem value="in_progress">
                                <div className="flex items-center gap-2">
                                </div>
                              </SelectItem>
                              <SelectItem value="closed">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Fermé
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-6 border-t">
                      <Button 
                        type="submit" 
                        className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                        disabled={isSaving || success}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="h-12 px-8 border-2 hover:bg-slate-50 transition-colors"
                        onClick={() => navigate(`/tickets/details/${id}`)}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b bg-slate-50">
                <CardTitle className="text-lg text-slate-800">Informations</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">ID du ticket</span>
                  <Badge variant="secondary" className="font-mono">#{id}</Badge>
                </div>
                {ticketData && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Statut actuel</span>
                      <Badge className={statusConfig[ticketData.status]?.color}>
                        {statusConfig[ticketData.status]?.label}
                      </Badge>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Modifiez les informations ci-contre et cliquez sur "Enregistrer" pour sauvegarder vos changements.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Conseils</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Soyez précis dans votre description</li>
                      <li>• Indiquez les étapes pour reproduire</li>
                      <li>• Mentionnez l'impact du problème</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketEdit;