'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setSubmitted(true);
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12 lg:sticky lg:top-20 lg:h-fit"
        >
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            {[
              {
                icon: FiMail,
                title: 'Email',
                value: 'devnayeem2k6@gmail.com',
                href: 'mailto:hello@foodhub.com'
              },
              {
                icon: FiPhone,
                title: 'Phone',
                value: '+8801407038855',
                href: 'tel:+15551234567'
              },
              {
                icon: FiMapPin,
                title: 'Address',
                value: '123 Food Street, Restaurant City, FC 12345',
                href: '#'
              },
              {
                icon: FiClock,
                title: 'Business Hours',
                value: 'Mon - Fri: 9AM - 6PM | Sat - Sun: 10AM - 4PM',
                href: '#'
              }
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-start space-x-4 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-blue-200 dark:hover:border-blue-800/50"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 transition-all">
                  <contact.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                    {contact.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{contact.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="glass p-10 lg:p-12 rounded-3xl shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className={`w-full px-6 py-5 rounded-3xl border-2 shadow-lg focus:outline-none focus:ring-4 transition-all duration-500 ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/20'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-2 text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-6 py-5 rounded-3xl border-2 shadow-lg focus:outline-none focus:ring-4 transition-all duration-500 ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/20'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="mt-2 text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Subject
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className={`w-full px-6 py-5 rounded-3xl border-2 shadow-lg focus:outline-none focus:ring-4 transition-all duration-500 ${
                      errors.subject
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/20'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="mt-2 text-red-500 text-sm">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className={`w-full px-6 py-5 rounded-3xl border-2 shadow-lg focus:outline-none focus:ring-4 resize-vertical transition-all duration-500 ${
                      errors.message
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/20'
                    }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="mt-2 text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-7 h-7" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FiCheck className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                    Thank You!
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                    Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary px-12 py-4 text-xl"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}