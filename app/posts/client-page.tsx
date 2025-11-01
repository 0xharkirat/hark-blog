'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PostConnectionQuery, PostConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { ArrowRight, UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClientPostProps {
  data: PostConnectionQuery;
  variables: PostConnectionQueryVariables;
  query: string;
}

export default function PostsClientPage(props: ClientPostProps) {
  const posts = props.data?.postConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post.date!);
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, 'MMM dd, yyyy');
    }

    return {
      id: post.id,
      published: formattedDate,
      title: post.title,
      tags: post.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/posts/${post._sys.breadcrumbs.join('/')}`,
      excerpt: post.excerpt,
      heroImg: post.heroImg,
      author: {
        name: post.author?.name || 'Anonymous',
        avatar: post.author?.avatar,
      }
    }
  });

  return (
    <ErrorBoundary>
      <Section>
        <div className="container flex flex-col items-center gap-16 py-12">
          <div className="text-center space-y-4">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Latest Articles
            </div>
            <h2 className="mx-auto mb-6 text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:max-w-3xl">
              Tech Blog
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.
            </p>
          </div>

          <div className="w-full space-y-12 lg:space-y-16">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className="group relative overflow-hidden border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50"
              >
                <div className="grid gap-8 p-6 sm:grid-cols-12 sm:gap-10 md:items-center md:p-8 lg:gap-12 lg:p-10">
                  <div className="sm:col-span-7 space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                      <Link
                        href={post.url}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    <div className="prose prose-gray max-w-none text-muted-foreground dark:prose-invert">
                      <TinaMarkdown content={post.excerpt} />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Avatar className="h-10 w-10 ring-2 ring-background shadow-md">
                        {post.author.avatar && (
                          <AvatarImage
                            src={post.author.avatar}
                            alt={post.author.name}
                          />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <UserRound size={18} strokeWidth={2} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{post.author.name}</span>
                        <span className="text-xs text-muted-foreground">{post.published}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Link
                        href={post.url}
                        className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3 hover:text-primary/80"
                      >
                        <span>Read article</span>
                        <ArrowRight className="size-5" />
                      </Link>
                    </div>
                  </div>
                  
                  {post.heroImg && (
                    <div className="sm:col-span-5">
                      <Link href={post.url} className="block group">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted">
                          <Image
                            width={600}
                            height={450}
                            src={post.heroImg}
                            alt={post.title}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
