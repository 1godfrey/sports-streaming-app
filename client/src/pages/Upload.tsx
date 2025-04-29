import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertGameSchema } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import SportFilters from '../components/SportFilters';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Extend the insertGameSchema with custom validations
const uploadFormSchema = insertGameSchema.extend({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  sport: z.string().min(1, 'Please select a sport'),
  description: z.string().optional(),
  isLive: z.boolean().default(false),
  startTime: z.date(),
  videoUrl: z.string().url('Please enter a valid URL'),
  thumbnailUrl: z.string().url('Please enter a valid URL')
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Form definition
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: '',
      sport: '',
      description: '',
      isLive: false,
      startTime: new Date(),
      videoUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e' // Default thumbnail
    }
  });

  // Handle video upload - this would be connected to a file upload service in a real app
  const handleFileSelect = () => {
    setIsUploading(true);
    
    // Simulating upload delay
    setTimeout(() => {
      setIsUploading(false);
      form.setValue('videoUrl', 'https://www.youtube.com/watch?v=demo-video-id');
      toast({
        title: "Video uploaded successfully",
        description: "Your video has been processed and is ready for submission."
      });
    }, 2000);
  };

  // Submit mutation
  const uploadMutation = useMutation({
    mutationFn: async (values: UploadFormValues) => {
      return await apiRequest('POST', '/api/upload', values);
    },
    onSuccess: () => {
      toast({
        title: "Game submitted successfully!",
        description: "Your game has been uploaded and will be available shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error uploading game",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Form submission handler
  function onSubmit(values: UploadFormValues) {
    uploadMutation.mutate(values);
  }

  return (
    <main>
      <SportFilters />
      
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Game</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Title *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. City Cup Finals: Team A vs Team B" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport Type *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="soccer">Soccer</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="volleyball">Volleyball</SelectItem>
                            <SelectItem value="mma">MMA</SelectItem>
                            <SelectItem value="tennis">Tennis</SelectItem>
                            <SelectItem value="baseball">Baseball</SelectItem>
                            <SelectItem value="hockey">Hockey</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe this game or event" 
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Date *</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isLive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Streaming Type *</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(value === 'live')}
                          defaultValue={field.value ? 'live' : 'recorded'}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select streaming type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="recorded">Recorded (Upload a video file)</SelectItem>
                            <SelectItem value="live">Live Stream (Use RTMP stream key)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                  onClick={handleFileSelect}
                >
                  <div className="space-y-2">
                    <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl"></i>
                    <h3 className="text-gray-700 font-medium">
                      {isUploading ? 'Uploading...' : 'Drag and drop your video file here'}
                    </h3>
                    <p className="text-gray-500 text-sm">or</p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      disabled={isUploading}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileSelect();
                      }}
                    >
                      {isUploading ? 'Processing...' : 'Browse files'}
                    </Button>
                    <p className="text-gray-500 text-xs mt-2">
                      Supported formats: MP4, MOV, AVI, MKV (max 10GB)
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button 
                    type="submit" 
                    disabled={uploadMutation.isPending || isUploading}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition duration-200"
                  >
                    {uploadMutation.isPending ? 'Uploading...' : 'Upload Game'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
